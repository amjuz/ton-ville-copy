import { expect, test } from '@test/fixtures/session.fixtures'

test.describe('Supabase Authentication', () => {
  test('should handle email otp auto signup', async ({ supabase }) => {
    const telegram_id = Date.now()
    const email = `telegram.${telegram_id}@test.com`
    const first_name = 'Tester'

    const {
      data: { user: generateLinkUser, properties },
      error: generateLinkError,
    } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        data: {
          telegram_id,
          first_name,
        },
      },
    })

    expect(generateLinkError).toBeNull()
    expect(generateLinkUser).toBeDefined()
    expect(properties).toBeDefined()
    expect(properties!.email_otp).toBeDefined()
    expect(properties!.verification_type).toBe('signup')

    const {
      error: verifyOtpError,
      data: { user: verifyOtpUser },
    } = await supabase.auth.verifyOtp({
      email,
      token: properties!.email_otp,
      type: 'signup',
    })

    expect(verifyOtpError).toBeNull()
    expect(verifyOtpUser).toBeDefined()
    expect(verifyOtpUser!.id).toBe(generateLinkUser!.id)
    expect(verifyOtpUser!.email).toBeDefined()
    expect(verifyOtpUser!.email).toBe(email)
    expect(verifyOtpUser!.user_metadata.telegram_id).toBeDefined()
    expect(verifyOtpUser!.user_metadata.telegram_id).toBe(telegram_id)
    expect(verifyOtpUser!.user_metadata.first_name).toBeDefined()
    expect(verifyOtpUser!.user_metadata.first_name).toBe(first_name)
  })
  test('should handle email otp auto login', async ({ supabase, session }) => {
    const email = session.user.email! // Use the email of the current test user
    expect(email).toBeDefined()

    const {
      data: { user: generateLinkUser, properties },
      error: generateLinkError,
    } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
    })

    expect(generateLinkError).toBeNull()
    expect(generateLinkUser).toBeDefined()
    expect(generateLinkUser!.email).toBe(email)
    expect(generateLinkUser!.id).toBe(session.user.id)
    expect(properties).toBeDefined()
    expect(properties!.email_otp).toBeDefined()
    expect(properties!.verification_type).toBe('magiclink')

    const {
      error: verifyOtpError,
      data: { user: verifyOtpUser },
    } = await supabase.auth.verifyOtp({
      email,
      token: properties!.email_otp,
      type: 'magiclink',
    })

    expect(verifyOtpError).toBeNull()
    expect(verifyOtpUser).toBeDefined()
    expect(verifyOtpUser!.id).toBe(generateLinkUser!.id)
    expect(verifyOtpUser!.email).toBeDefined()
    expect(verifyOtpUser!.email).toBe(email)
  })
  // test('should handle signup with invalid referral code', async ({ supabase }) => {
  //   const telegram_id = Date.now()
  //   const email = `telegram.${telegram_id}@test.com`
  //   const referral_code = 'FAK3C0DE'
  //
  //   /**
  //    * After successful signup, the `supabase` client assumes `authenticated role.
  //    * Since, `authenticated` role cannot be given `select` rls on every rows of `referrals` table other than the one created by the user.,
  //    * `referral_code` should be tested before signup.
  //    */
  //   const { data, error } = await supabase
  //     .from('referrals')
  //     .select()
  //     .eq('code', referral_code)
  //     .single()
  //
  //   expect(error).toBeNull()
  //   expect(data).toBeNull()
  //
  //   // Signup with invalid referral code
  //   const {
  //     error: signupError,
  //     data: { user: signupUser },
  //   } = await supabase.auth.signUp({
  //     email,
  //     password: 'p@55w0rd',
  //     options: {
  //       data: {
  //         telegram_id,
  //         referral_code,
  //       },
  //     },
  //   })
  //
  //   expect(signupError).toBeNull()
  //   expect(signupUser).toBeDefined()
  //   expect(signupUser!.email).toBe(email)
  //
  //   // Check `profiles` table to ensure no `referrer_id` is set
  //   const { data: profile, error: getProfilesError } = await supabase
  //     .from('profiles')
  //     .select()
  //     .eq('id', signupUser!.id)
  //     .single()
  //
  //   expect(getProfilesError).toBeNull()
  //   expect(profile).toBeDefined()
  //   expect(profile!.referrer_id).toBeNull()
  // })
})
