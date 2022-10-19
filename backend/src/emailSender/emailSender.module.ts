import { Module } from '@nestjs/common';
import { EmailSender } from './emailSender.service';

@Module({
  providers: [EmailSender],
  exports: [EmailSender],
})
export class EmailSenderModule {}
