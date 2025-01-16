import { ResponseDto } from '@libs/dtos';
import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiResponseSchemaHost,
  getSchemaPath,
} from '@nestjs/swagger';
type ApiCustomResponseOptions = Omit<ApiResponseSchemaHost, 'schema'> & {
  dataType?: 'array' | 'object';
};
export const ApiCustomResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  options?: ApiCustomResponseOptions,
) => {
  const { dataType, ...restOptions } = options;
  return applyDecorators(
    ApiExtraModels(ResponseDto, dataDto),
    ApiResponse({
      ...restOptions,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                type: dataType,
                ...(dataType === 'array'
                  ? { items: { $ref: getSchemaPath(dataDto) } }
                  : {}),
                ...(dataType === 'object'
                  ? { $ref: getSchemaPath(dataDto) }
                  : {}),
              },
            },
          },
        ],
      },
    }),
  );
};
