'use server'

import { encodedRedirect } from '@/utils/utils'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { revalidatePath } from 'next/cache'

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required',
    )
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return encodedRedirect('error', '/sign-up', error.message)
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.',
    )
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message)
  }

  return redirect('/dashboard')
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password',
    )
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.',
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required',
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match',
    )
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed',
    )
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated')
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/sign-in')
}

export const insertStoolAction = async (prevState: any, formData: FormData) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/new-stool')
  }
  const userId = data?.user.id

  // フォームデータの取得
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const scale = Number.parseInt(formData.get('bristolScale') as string)
  const volume = Number.parseInt(formData.get('stoolVolume') as string)
  const color = Number.parseInt(formData.get('stoolColor') as string)

  // 日付と時刻を組み合わせて1つのDateオブジェクトを作成
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const dateTime = new Date(year, month - 1, day, hours, minutes)

  // ここでデータベースに保存するなどの処理を行う
  console.log('Insert new stool:', {
    dateTime,
    scale,
    volume,
    color,
  })

  const res = await supabase.from('stool_records').insert({
    user_id: userId,
    scale: scale,
    volume: volume,
    color: color,
    date: dateTime,
  })
  console.log(res)
  // 必要に応じてキャッシュを再検証
  revalidatePath('/')

  return { success: true }
}

export const updateStoolAction = async (prevState: any, formData: FormData) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/new-stool')
  }
  const userId = data?.user.id

  // フォームデータの取得
  const id = formData.get('id') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const scale = Number.parseInt(formData.get('bristolScale') as string)
  const volume = Number.parseInt(formData.get('stoolVolume') as string)
  const color = Number.parseInt(formData.get('stoolColor') as string)

  // 日付と時刻を組み合わせて1つのDateオブジェクトを作成
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const dateTime = new Date(year, month - 1, day, hours, minutes)

  // ここでデータベースに保存するなどの処理を行う
  console.log('Updating existing stool:', {
    id,
    dateTime,
    scale,
    volume,
    color,
  })

  const res = await supabase
    .from('stool_records')
    .update({
      // user_id: userId,
      scale: scale,
      volume: volume,
      color: color,
      date: dateTime,
    })
    .eq('id', id)
    .select()

  console.log(res)
  // 必要に応じてキャッシュを再検証
  revalidatePath('/')

  return { success: true }
}

export const deleteStoolAction = async (prevState: any, formData: FormData) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/new-stool')
  }
  console.log('Delete existing stool:', formData)
  const id = formData.get('id')
  const res = await supabase.from('stool_records').delete().eq('id', id)
  console.log(res)
  // 必要に応じてキャッシュを再検証
  revalidatePath('/')

  return { success: true }
}
