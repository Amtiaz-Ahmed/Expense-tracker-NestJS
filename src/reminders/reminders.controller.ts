import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { GetUser } from 'src/common/decorators/get-user.decorator';


@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) { }

  @Post()
  create(@Body() createReminderDto: CreateReminderDto, @GetUser() user: any) {
    return this.remindersService.create(createReminderDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.remindersService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.remindersService.findOne(+id, user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto, @GetUser() user: any) {
    return this.remindersService.update(+id, updateReminderDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: any) {
    return this.remindersService.remove(+id, user.userId);
  }
}
