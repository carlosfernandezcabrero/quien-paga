import { z } from 'zod'

export const PARTICIPANT_FIELD_VALIDATION = z.string().trim().min(1)
