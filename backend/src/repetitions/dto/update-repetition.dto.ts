import { PartialType } from '@nestjs/mapped-types';
import { CreateRepetitionDto } from './create-repetition.dto';

export class UpdateRepetitionDto extends PartialType(CreateRepetitionDto) {}
