import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@libs/constants';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// import { Reflector } from '@nestjs/core';

// export const Roles = Reflector.createDecorator<string[]>();