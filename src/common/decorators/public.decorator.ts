import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// import { Reflector } from '@nestjs/core';

// export const Roles = Reflector.createDecorator<string[]>();