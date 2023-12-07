import { FC } from "react";

export type ClassNameDecoratorProps = {
    className?: string | undefined;
};

export type ClassNameDecorator<T> = FC<T & ClassNameDecoratorProps>;
