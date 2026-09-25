import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const clientId =
    process.env.GOOGLE_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId || !clientId.trim()) {
    return NextResponse.redirect(`${origin}/?auth_error=missing_client_id`);
  }

  const redirectUri = `${origin}/auth/callback`;
  const nonce = Math.random().toString(36).substring(2);
  const state = Math.random().toString(36).substring(2);

  const params = new URLSearchParams({
    client_id: clientId.trim(),
    redirect_uri: redirectUri,
    response_type: 'token id_token',
    scope: 'openid profile email',
    prompt: 'select_account',
    nonce: nonce,
    state: state,
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
