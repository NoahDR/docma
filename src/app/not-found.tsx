import type { Metadata } from "next"

import { appFontVariables } from "./fonts"
import "./globals.css"

import { NotFoundScreen } from "@/components/not-found/not-found-screen"
import { getNotFoundCopy } from "@/lib/not-found-copy"

const { meta } = getNotFoundCopy("de")

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
}

export default function RootNotFound() {
  return (
    <div className={appFontVariables}>
      <NotFoundScreen locale="de" navigationMode="document" />
    </div>
  )
}
