import Link from "next/link";
import type { NavLink } from "../../sanity/lib/data";

export default function Nav({
  logo,
  links,
}: {
  logo: string;
  links: NavLink[];
}) {
  const visible = links.filter((l) => !l.hidden);

  return (
    <nav className="nav">
      <Link href="/" className="nav__logo">{logo}</Link>
      <ul className="nav__links">
        {visible.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="nav__link" data-label={label}>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
