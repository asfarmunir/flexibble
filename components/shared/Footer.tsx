import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../../lib/constants";

type footerTypes = {
  title: string;
  links: Array<string>;
};

const FooterColoumn = ({ title, links }: footerTypes) => {
  return (
    <div className="footer_column">
      <h3 className="text-normal font-bold ">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link, index) => (
          <Link key={index} className="text-sm text-slate-500" href={"/"}>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer border-t border-slate-200">
      <div className="flex gap-3 mb-6 flex-col">
        <Image src="/logo-purple.svg" width={90} height={50} alt="Logo" />
        <p className="text-sm font-thin text-slate-600 max-w-sm ">
          Great place to showcase your skills and projects and get hired. Made
          by developers for developers.
        </p>
      </div>
      <div className=" flex items-start mb-4 justify-start gap-14 flex-wrap">
        <div>
          <FooterColoumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
        </div>

        <div className="hidden md:flex flex-col gap-2">
          <FooterColoumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />
          <FooterColoumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />
        </div>
        <div className="hidden md:block">
          <FooterColoumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
        </div>

        <div className="hidden md:flex  flex-col gap-3">
          <FooterColoumn
            title={footerLinks[5].title}
            links={footerLinks[5].links}
          />
          <FooterColoumn
            title={footerLinks[4].title}
            links={footerLinks[4].links}
          />
        </div>
        <div className="hidden md:block">
          <FooterColoumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-between items-center justify-center text-slate-500  mt-5">
        <p className="text-xs font-semibold text-primary-100">
          @2024 Asfar Munir Asfi.{" "}
          <span className="font-normal text-slate-500">
            All Rights Reserved
          </span>
        </p>
        <p className="text-xs">
          <b>1937 </b>Projects Submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
