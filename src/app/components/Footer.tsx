import Image from 'next/image';
import Link from 'next/link';

const navigation = {
  pages: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Generate', href: '/generate' },
    { name: 'Learn', href: '/learn' },
  ],
  resources: [
    { name: 'Blog', href: '#' },
    { name: 'Docs', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-(--primary) text-white">
      <div className="m-auto max-w-[1228px] flex flex-wrap lg:justify-between gap-5 md:gap-8 px-6 py-10">
        <div className="flex flex-col gap-5">
          <Image
            className="invert"
            src="/logo-lg.svg"
            width={185}
            height={40}
            alt="HanjaDeck.ai"
          />
          <p className="text-sm! text-zinc-300!">
            AI-powered Hanja flashcard generation.
          </p>
          <Link
            href="https://github.com/xorms571/hanjadeck.ai"
            className="text-sm text-zinc-300 hover:text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </Link>
          <a
            href="mailto:xorms6865@naver.com"
            className="text-sm text-zinc-300 hover:text-white hover:underline"
          >
            xorms6865@naver.com
          </a>
          <p className="text-center text-sm! text-zinc-300!">
            &copy; {new Date().getFullYear()} HanjaDeck.ai. All rights reserved.
          </p>
        </div>
        <div className="md:col-start-2 lg:w-50">
          <h3 className="text-base! mt-3 font-semibold text-white">Pages</h3>
          <ul role="list" className="mt-4 space-y-2">
            {navigation.pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-zinc-300 hover:text-white hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-50">
          <h3 className="text-base! mt-3 font-semibold text-white">Resources</h3>
          <ul role="list" className="mt-4 space-y-2">
            {navigation.resources.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-zinc-300 hover:text-white hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-50">
          <h3 className="text-base! mt-3 font-semibold text-white">Legal</h3>
          <ul role="list" className="mt-4 space-y-2">
            {navigation.legal.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-zinc-300 hover:text-white hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

