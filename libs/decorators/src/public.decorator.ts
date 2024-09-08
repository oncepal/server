import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from '@libs/constants';

export const Public = () => SetMetadata(IS_PUBLIC, true);

// import { Reflector } from '@nestjs/core';

// export const Roles = Reflector.createDecorator<string[]>();