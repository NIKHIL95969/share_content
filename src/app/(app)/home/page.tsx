// import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
// import { CardsDemo } from "@/components/cards"
// import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
// import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/components/ui/button"

const title = "QuikShare"
const description =
  "🚀 Instantly share text, code snippets, and files between your devices. No more emailing yourself links."

export const dynamic = "force-static"
export const revalidate = false

// export const metadata: Metadata = {
//   title,
//   description,
//   openGraph: {
//     images: [
//       {
//         url: `/og?title=${encodeURIComponent(
//           title
//         )}&description=${encodeURIComponent(description)}`,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     images: [
//       {
//         url: `/og?title=${encodeURIComponent(
//           title
//         )}&description=${encodeURIComponent(description)}`,
//       },
//     ],
//   },
// }

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/code">Explore Features</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <PageNav className="hidden md:flex">
        {/* <ExamplesNav className="[&>a:first-child]:text-primary flex-1 overflow-hidden" /> */}
        {/* <ThemeSelector className="mr-4 hidden md:flex" /> */}
      </PageNav>
      <div className="container-wrapper section-soft flex-1 pb-6">
        <div className="container overflow-hidden">
          <section className="border-border/50 -mx-4 w-[160vw] overflow-hidden rounded-lg border md:w-[150vw]">
            <Image
              src="/home-img.png"
              width={1400}
              height={875}
              alt="Dashboard"
              className="block dark:hidden"
              priority
            />
            <Image
              src="/home-img.png"
              width={1400}
              height={875}
              alt="Dashboard"
              className="hidden dark:block"
              priority
            />
          </section>
          <section className="theme-container hidden md:block">
            {/* <CardsDemo /> */}
          </section>
        </div>
      </div>
    </div>
  )
}