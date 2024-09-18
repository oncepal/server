import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl.factory';

@Global()
@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}