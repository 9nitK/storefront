"use client";

import { ReactNode } from "react";
import { ApolloWrapper } from "./ApolloWrapper";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
