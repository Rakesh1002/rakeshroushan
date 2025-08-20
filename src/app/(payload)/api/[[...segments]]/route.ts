/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { NextRequest } from 'next/server'

import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = (req: NextRequest, { params }: { params: { segments: string[] } }) =>
  REST_GET(req, params.segments, config)

export const POST = (req: NextRequest, { params }: { params: { segments: string[] } }) =>
  REST_POST(req, params.segments, config)

export const DELETE = (req: NextRequest, { params }: { params: { segments: string[] } }) =>
  REST_DELETE(req, params.segments, config)

export const PATCH = (req: NextRequest, { params }: { params: { segments: string[] } }) =>
  REST_PATCH(req, params.segments, config)