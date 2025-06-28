"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  WrenchScrewdriverIcon,
  WrenchIcon,
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon, Tooltip: "Home" },
  {
    name: "Meu Perfil",
    href: "/dashboard/perfil",
    icon: AdjustmentsHorizontalIcon,
    Tooltip: "Seus dados",
  },
  {
    name: "Serviços",
    href: "/dashboard/portifolios",
    icon: WrenchScrewdriverIcon,
    Tooltip: "Todos os serviços",
  },
  {
    name: "Atendimentos",
    href: "/dashboard/services",
    icon: WrenchIcon,
    Tooltip: "Registro dos atendimentos",
  },
  {
    name: "Clientes",
    href: "/dashboard/customers",
    icon: UserGroupIcon,
    Tooltip: "Clientes",
  },
  {
    name: "Assinatura",
    href: "/dashboard/signature",
    icon: BanknotesIcon,
    Tooltip: "Assinatura",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            title={link.Tooltip}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-warning hover:text-black md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-warning text-black": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
