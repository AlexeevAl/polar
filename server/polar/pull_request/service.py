from collections.abc import Sequence
from uuid import UUID

from polar.enums import Platforms
from polar.kit.services import ResourceService
from polar.models.pull_request import PullRequest
from polar.postgres import AsyncSession, sql

from .schemas import FullPullRequestCreate, MinimalPullRequestCreate, PullRequestUpdate


class PullRequestService(
    ResourceService[PullRequest, MinimalPullRequestCreate, PullRequestUpdate]
):
    async def get_by_platform(
        self, session: AsyncSession, platform: Platforms, external_id: int
    ) -> PullRequest | None:
        return await self.get_by(session, platform=platform, external_id=external_id)

    async def list_by_repository(
        self, session: AsyncSession, repository_id: UUID
    ) -> Sequence[PullRequest]:
        statement = sql.select(PullRequest).where(
            PullRequest.repository_id == repository_id
        )
        res = await session.execute(statement)
        return res.scalars().unique().all()


class FullPullRequestService(
    ResourceService[PullRequest, FullPullRequestCreate, PullRequestUpdate]
):
    async def create_or_update(
        self, session: AsyncSession, r: FullPullRequestCreate
    ) -> PullRequest:
        insert_stmt = sql.insert(PullRequest).values(**r.model_dump())
        stmt = (
            insert_stmt.on_conflict_do_update(
                index_elements=[PullRequest.external_id],
                set_={
                    k: getattr(insert_stmt.excluded, k)
                    for k in FullPullRequestCreate.__mutable_keys__
                },
            )
            .returning(PullRequest)
            .execution_options(populate_existing=True)
        )

        res = await session.execute(stmt)
        await session.commit()
        return res.scalars().one()


pull_request = PullRequestService(PullRequest)
full_pull_request = FullPullRequestService(PullRequest)
