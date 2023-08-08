import Image from 'next/image'
import LinkButton from '@/components/LinkButton'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Get started by editing&nbsp;
                    <code className="font-mono font-bold">
                        src/app/page.tsx
                    </code>
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none" />
            </div>

            <h1 className="w-fit mx-auto text-5xl font-bold text-center">
                Minimal Starter Template for
            </h1>
            <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap gap-4"
            >
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </a>
            <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://github.com/GLD5000"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className="w-fit mx-auto text-3xl font-bold text-center">
                    Made by GLD5000
                </h2>
            </a>
            <LinkButton
                link="https://github.com/GLD5000/GLD-NextTemplate"
                text=" Repo on GitHub"
            />

            <div className="grid gap-4">
                <h1 className="w-fit mx-auto text-5xl font-bold">Including:</h1>

                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                    <LinkButton
                        link="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html"
                        text="TypeScript"
                    />
                    <LinkButton
                        link="https://tailwindcss.com/docs/installation"
                        text="Tailwind CSS"
                    />
                    <LinkButton
                        link="https://jestjs.io/docs/getting-started"
                        text="Jest"
                    />
                    <LinkButton
                        link="https://eslint.org/docs/latest/use/getting-started"
                        text="ESLint"
                    />
                    <LinkButton
                        link="https://prettier.io/docs/en/install.html"
                        text="Prettier"
                    />
                    <LinkButton
                        link="https://typicode.github.io/husky/getting-started.html"
                        text="Husky"
                    />
                    <LinkButton
                        link="https://github.com/okonet/lint-staged"
                        text="Lint-Staged"
                    />
                </div>
            </div>
        </main>
    )
}
