import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import morgan from 'morgan';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/models/user.model';
import { Income } from './income/models/income.model';
import { Expense } from './expense/models/expense.model';
import { ExpenseReceipt } from './expense/models/expense-receipt.model';
import { ExpenseCategory } from './categories/models/expense-category.model';
import { Reminder } from './reminders/models/reminder.model';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoriesModule } from './categories/categories.module';
import { RemindersModule } from './reminders/reminders.module';
import { ReportsModule } from './reports/reports.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Income, Expense, ExpenseReceipt, ExpenseCategory, Reminder],
      autoLoadModels: true,
      synchronize: true, // ❗ dev only
      sync: { alter: true },
      logging: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,    // seconds
          limit: 10,  // requests
        },
      ],
    }),


    UsersModule,
    AuthModule,
    IncomeModule,
    ExpenseModule,
    CategoriesModule,
    RemindersModule,
    ReportsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('dev')) // 'dev' format: colored output for development
      .forRoutes('*'); // Apply to all routes
  }
}
