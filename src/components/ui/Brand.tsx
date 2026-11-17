import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Angodeserto, início">
      <Image src="/media/logotipo.webp" alt="" width={40} height={40} loading="eager" unoptimized />
      <span>Angodeserto</span>
    </Link>
  );
}
