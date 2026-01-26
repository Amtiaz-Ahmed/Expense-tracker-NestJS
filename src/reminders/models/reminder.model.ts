import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { ExpenseCategory } from '../../categories/models/expense-category.model';

@Table({ tableName: 'reminders' })
export class Reminder extends Model<Reminder> {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @ForeignKey(() => ExpenseCategory)
    @Column(DataType.INTEGER)
    categoryId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    amount: number;

    @Column(DataType.DATEONLY)
    reminderDate: Date;

    @Column(DataType.TIME)
    reminderTime: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isCompleted: boolean;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => ExpenseCategory)
    category: ExpenseCategory;
}
