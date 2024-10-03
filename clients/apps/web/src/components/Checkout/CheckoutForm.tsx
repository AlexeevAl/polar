'use client'

import {
  CheckoutConfirmStripe,
  CheckoutPublic,
  CheckoutUpdatePublic,
  SubscriptionRecurringInterval,
} from '@polar-sh/sdk'
import { formatCurrencyAndAmount } from '@polarkit/lib/money'
import {
  Elements,
  ElementsConsumer,
  PaymentElement,
} from '@stripe/react-stripe-js'
import {
  ConfirmationToken,
  loadStripe,
  Stripe,
  StripeElements,
  StripeError,
} from '@stripe/stripe-js'
import debounce from 'lodash.debounce'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import Button from 'polarkit/components/ui/atoms/button'
import CountryPicker from 'polarkit/components/ui/atoms/countrypicker'
import CountryStatePicker from 'polarkit/components/ui/atoms/countrystatepicker'
import Input from 'polarkit/components/ui/atoms/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'polarkit/components/ui/form'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useFormContext, WatchObserver } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import LogoType from '../Brand/LogoType'
import AmountLabel from '../Shared/AmountLabel'

const DetailRow = ({
  title,
  emphasis,
  children,
}: PropsWithChildren<{ title: string; emphasis?: boolean }>) => {
  return (
    <div
      className={twMerge(
        'flex flex-row items-center justify-between gap-x-8',
        emphasis ? 'font-medium' : 'dark:text-polar-500 text-gray-500',
      )}
    >
      <span>{title}</span>
      {children}
    </div>
  )
}

interface BaseCheckoutFormProps {
  onSubmit: (value: any) => Promise<void>
  onCheckoutUpdate?: (body: CheckoutUpdatePublic) => Promise<CheckoutPublic>
  amount: number | null
  taxAmount: number | null
  currency: string | null
  isPaymentRequired: boolean
  interval?: SubscriptionRecurringInterval
  disabled?: boolean
  loading?: boolean
}

const BaseCheckoutForm = ({
  onSubmit,
  onCheckoutUpdate,
  amount,
  taxAmount,
  currency,
  isPaymentRequired,
  interval,
  disabled,
  loading,
  children,
}: React.PropsWithChildren<BaseCheckoutFormProps>) => {
  const form = useFormContext<CheckoutUpdatePublic>()
  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    resetField,
    formState: { errors },
  } = form

  const country = watch('customer_billing_address.country')
  const watcher: WatchObserver<CheckoutUpdatePublic> = useCallback(
    async (value, { name, type }) => {
      if (type !== 'change' || !name || !onCheckoutUpdate) {
        return
      }

      let payload: CheckoutUpdatePublic = {}
      // Update Tax ID
      if (name === 'customer_tax_id') {
        payload = { ...payload, customer_tax_id: value.customer_tax_id }
        clearErrors('customer_tax_id')
        // Update country, make sure to reset other address fields
      } else if (name === 'customer_billing_address.country') {
        const { customer_billing_address } = value
        if (customer_billing_address && customer_billing_address.country) {
          payload = {
            ...payload,
            customer_billing_address: {
              country: customer_billing_address.country,
            },
          }
          resetField('customer_billing_address', {
            defaultValue: { country: customer_billing_address.country },
          })
        }
        // Update other address fields
      } else if (name.startsWith('customer_billing_address')) {
        const { customer_billing_address } = value
        if (customer_billing_address && customer_billing_address.country) {
          payload = {
            ...payload,
            customer_billing_address: {
              ...customer_billing_address,
              country: customer_billing_address.country,
            },
          }
          clearErrors('customer_billing_address')
        }
      }

      if (Object.keys(payload).length === 0) {
        return
      }

      try {
        await onCheckoutUpdate(payload)
      } catch {}
    },
    [clearErrors, resetField, onCheckoutUpdate],
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedWatcher = useCallback(debounce(watcher, 500), [watcher])

  useEffect(() => {
    const subscription = watch(debouncedWatcher)
    return () => subscription.unsubscribe()
  }, [watch, debouncedWatcher])

  return (
    <div className="flex w-1/2 flex-col justify-between gap-y-24 p-20">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl">Checkout</h1>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-12"
          >
            <div className="flex flex-col gap-y-6">
              <FormField
                control={control}
                name="customer_email"
                rules={{
                  required: 'This field is required',
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {children}

              {isPaymentRequired && (
                <>
                  <FormField
                    control={control}
                    name="customer_name"
                    rules={{
                      required: 'This field is required',
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            autoComplete="name"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Billing address</FormLabel>
                    <FormControl>
                      <FormField
                        control={control}
                        name="customer_billing_address.country"
                        rules={{
                          required: 'This field is required',
                        }}
                        render={({ field }) => (
                          <>
                            <CountryPicker
                              autoComplete="billing country"
                              value={field.value || undefined}
                              onChange={field.onChange}
                            />
                            <FormMessage />
                          </>
                        )}
                      />
                    </FormControl>
                    {(country === 'US' || country === 'CA') && (
                      <FormControl>
                        <FormField
                          control={control}
                          name="customer_billing_address.state"
                          rules={{
                            required: 'This field is required',
                          }}
                          render={({ field }) => (
                            <>
                              <CountryStatePicker
                                autoComplete="billing address-level1"
                                country={country}
                                value={field.value || undefined}
                                onChange={field.onChange}
                              />
                              <FormMessage />
                            </>
                          )}
                        />
                      </FormControl>
                    )}
                    {country === 'US' && (
                      <>
                        <FormControl>
                          <FormField
                            control={control}
                            name="customer_billing_address.line1"
                            rules={{
                              required: 'This field is required',
                            }}
                            render={({ field }) => (
                              <>
                                <Input
                                  type="text"
                                  autoComplete="billing address-line1"
                                  placeholder="Line 1"
                                  {...field}
                                  value={field.value || ''}
                                />
                                <FormMessage />
                              </>
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormField
                            control={control}
                            name="customer_billing_address.line2"
                            render={({ field }) => (
                              <>
                                <Input
                                  type="text"
                                  autoComplete="billing address-line2"
                                  placeholder="Line 2"
                                  {...field}
                                  value={field.value || ''}
                                />
                                <FormMessage />
                              </>
                            )}
                          />
                        </FormControl>
                        <div className="grid grid-cols-2 gap-x-2">
                          <FormControl>
                            <FormField
                              control={control}
                              name="customer_billing_address.postal_code"
                              rules={{
                                required: 'This field is required',
                              }}
                              render={({ field }) => (
                                <>
                                  <Input
                                    type="text"
                                    autoComplete="billing postal-code"
                                    placeholder="Postal code"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                  <FormMessage />
                                </>
                              )}
                            />
                          </FormControl>
                          <FormControl>
                            <FormField
                              control={control}
                              name="customer_billing_address.city"
                              rules={{
                                required: 'This field is required',
                              }}
                              render={({ field }) => (
                                <>
                                  <Input
                                    type="text"
                                    autoComplete="billing address-level2"
                                    placeholder="City"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                  <FormMessage />
                                </>
                              )}
                            />
                          </FormControl>
                        </div>
                      </>
                    )}
                    {errors.customer_billing_address?.message && (
                      <p className="text-destructive-foreground text-sm">
                        {errors.customer_billing_address.message}
                      </p>
                    )}
                  </FormItem>

                  <FormField
                    control={control}
                    name="customer_tax_id"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row items-center justify-between">
                          <FormLabel>Tax ID</FormLabel>
                          <span className="dark:text-polar-500 text-xs text-gray-500">
                            Optional
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            type="text"
                            autoComplete="off"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*
              <FormField
                control={control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center justify-between">
                      <FormLabel>Discount Code</FormLabel>
                      <span className="dark:text-polar-500 text-xs text-gray-500">
                        Optional
                      </span>
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
                </>
              )}
            </div>
            {isPaymentRequired && (
              <div className="flex flex-col gap-y-2">
                {amount && currency ? (
                  <>
                    <DetailRow title="Subtotal">
                      <AmountLabel
                        amount={amount}
                        currency={currency}
                        interval={interval}
                      />
                    </DetailRow>
                    {taxAmount !== null && (
                      <DetailRow title="VAT / Sales Tax">
                        {formatCurrencyAndAmount(taxAmount, currency)}
                      </DetailRow>
                    )}
                    {/* {discountCode && (
                  <DetailRow title={`Discount Code (${discountCode})`}>
                    <span>$19</span>
                  </DetailRow>
                )} */}
                    <DetailRow title="Total" emphasis>
                      <AmountLabel
                        amount={amount + (taxAmount || 0)}
                        currency={currency}
                        interval={interval}
                      />
                    </DetailRow>
                  </>
                ) : (
                  <span>Free</span>
                )}
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              wrapperClassNames="text-base"
              disabled={disabled}
              loading={loading}
            >
              {!isPaymentRequired ? 'Submit' : interval ? 'Subscribe' : 'Pay'}
            </Button>
            {errors.root && (
              <p className="text-destructive-foreground text-sm">
                {errors.root.message}
              </p>
            )}
          </form>
        </Form>
        <p className="dark:text-polar-500 text-center text-xs text-gray-500">
          This order is processed by our online reseller & Merchant of Record,
          Polar, who also handles order-related inquiries and returns.
        </p>
      </div>
      <div className="dark:text-polar-600 flex w-full flex-row items-center justify-center gap-x-3 text-sm text-gray-400">
        <span>Powered by</span>
        <LogoType className="h-5" />
      </div>
    </div>
  )
}

interface CheckoutFormProps {
  checkout: CheckoutPublic
  onCheckoutUpdate?: (body: CheckoutUpdatePublic) => Promise<CheckoutPublic>
  onCheckoutConfirm?: (body: CheckoutConfirmStripe) => Promise<CheckoutPublic>
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '')

const StripeCheckoutForm = (props: CheckoutFormProps) => {
  const router = useRouter()
  const { setError } = useFormContext<CheckoutUpdatePublic>()
  const { checkout, onCheckoutUpdate, onCheckoutConfirm } = props
  const { resolvedTheme } = useTheme()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (
    data: CheckoutUpdatePublic,
    stripe: Stripe | null,
    elements: StripeElements | null,
  ) => {
    if (!onCheckoutConfirm) {
      return
    }

    setLoading(true)

    if (!checkout.is_payment_required) {
      let updatedCheckout: CheckoutPublic
      try {
        updatedCheckout = await onCheckoutConfirm(data)
      } catch (e) {
        setLoading(false)
        return
      }
      await router.push(
        `/checkout/${updatedCheckout.client_secret}/confirmation`,
      )
      return
    }

    if (!stripe || !elements) {
      setLoading(false)
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      // Don't show validation errors, as they are already shown in their form
      if (submitError.type !== 'validation_error') {
        setError('root', { message: submitError.message })
      }
      setLoading(false)
      return
    }

    let confirmationToken: ConfirmationToken | undefined
    let error: StripeError | undefined
    try {
      const confirmationTokenResponse = await stripe.createConfirmationToken({
        elements,
        params: {
          payment_method_data: {
            // Stripe requires fields to be explicitly set to null if they are not provided
            billing_details: {
              name: data.customer_name,
              email: data.customer_email,
              address: {
                line1: data.customer_billing_address?.line1 || null,
                line2: data.customer_billing_address?.line2 || null,
                postal_code: data.customer_billing_address?.postal_code || null,
                city: data.customer_billing_address?.city || null,
                state: data.customer_billing_address?.state || null,
                country: data.customer_billing_address?.country || null,
              },
              phone: null,
            },
          },
        },
      })
      confirmationToken = confirmationTokenResponse.confirmationToken
      error = confirmationTokenResponse.error
    } catch (err) {
      setLoading(false)
      throw err
    }

    if (!confirmationToken || error) {
      setError('root', {
        message:
          error?.message ||
          'Failed to create confirmation token, please try again later.',
      })
      setLoading(false)
      return
    }

    let updatedCheckout: CheckoutPublic
    try {
      updatedCheckout = await onCheckoutConfirm({
        ...data,
        confirmation_token_id: confirmationToken.id,
      })
    } catch (e) {
      setLoading(false)
      return
    }

    const { payment_intent_status, payment_intent_client_secret } =
      updatedCheckout.payment_processor_metadata as Record<string, string>

    if (payment_intent_status === 'requires_action') {
      const { error } = await stripe.handleNextAction({
        clientSecret: payment_intent_client_secret,
      })
      if (error) {
        setLoading(false)
        setError('root', { message: error.message })
        return
      }
    }

    await router.push(`/checkout/${checkout.client_secret}/confirmation`)
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        ...(checkout.is_payment_required
          ? {
              mode:
                checkout.product_price.type === 'recurring'
                  ? 'subscription'
                  : 'payment',
              setupFutureUsage:
                checkout.product_price.type === 'recurring'
                  ? 'off_session'
                  : undefined,
              paymentMethodCreation: 'manual',
              amount: checkout.amount || 0,
              currency: checkout.currency || 'usd',
            }
          : {}),
        appearance: {
          rules: {
            '.Label': {
              color: resolvedTheme === 'dark' ? 'white' : 'black',
              fontWeight: '500',
              fontSize: '14px',
              marginBottom: '8px',
            },
            '.Input': {
              padding: '12px',
              backgroundColor:
                resolvedTheme === 'dark' ? 'rgb(28 28 34)' : 'white',
              border: '0px',
              color: resolvedTheme === 'dark' ? '#E5E5E1' : '#181A1F',
              borderRadius: '9999px',
            },
            '.Input:focus': {
              borderColor: resolvedTheme === 'dark' ? '#4667CA' : '#A5C2EB',
            },
            '.Tab': {
              backgroundColor: 'transparent',
            },
          },
          variables: {
            borderRadius: '8px',
            fontFamily: '"Inter var", Inter, sans-serif',
            fontSizeBase: '0.875rem',
            spacingGridRow: '18px',
            colorDanger: resolvedTheme === 'dark' ? '#F17878' : '#E64D4D',
          },
        },
        fonts: [
          {
            cssSrc:
              'https://fonts.googleapis.com/css2?family=Inter:wght@400;500',
          },
        ],
      }}
    >
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <BaseCheckoutForm
            {...props}
            amount={checkout.amount}
            taxAmount={checkout.tax_amount}
            currency={checkout.currency}
            isPaymentRequired={checkout.is_payment_required}
            interval={
              checkout.product_price.type === 'recurring'
                ? checkout.product_price.recurring_interval
                : undefined
            }
            onSubmit={(data) => onSubmit(data, stripe, elements)}
            onCheckoutUpdate={onCheckoutUpdate}
            loading={loading}
          >
            {checkout.is_payment_required && (
              <PaymentElement
                options={{
                  fields: {
                    billingDetails: {
                      name: 'never',
                      email: 'never',
                      phone: 'never',
                      address: 'never',
                    },
                  },
                }}
              />
            )}
          </BaseCheckoutForm>
        )}
      </ElementsConsumer>
    </Elements>
  )
}

const DummyCheckoutForm = ({ checkout }: CheckoutFormProps) => {
  return (
    <BaseCheckoutForm
      amount={checkout.amount}
      taxAmount={checkout.tax_amount}
      currency={checkout.currency}
      isPaymentRequired={checkout.is_payment_required}
      onSubmit={async () => {}}
      onCheckoutUpdate={async () => checkout}
      disabled={true}
    />
  )
}

export const CheckoutForm = (props: CheckoutFormProps) => {
  const {
    checkout: { payment_processor },
  } = props

  if (payment_processor === 'stripe') {
    return <StripeCheckoutForm {...props} />
  }
  return <DummyCheckoutForm {...props} />
}
