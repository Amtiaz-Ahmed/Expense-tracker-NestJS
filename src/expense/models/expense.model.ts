import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { ExpenseCategory } from 'src/categories/models/expense-category.model';
import { ExpenseReceipt } from './expense-receipt.model';

@Table({ tableName: 'expenses' })
export class Expense extends Model<Expense> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => ExpenseCategory)
    @Column({ type: DataType.INTEGER })
    categoryId: number;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    amount: number;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    date: Date;

    @Column({ type: DataType.STRING })
    description: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => ExpenseCategory)
    category: ExpenseCategory;

    @HasMany(() => ExpenseReceipt)
    receipts: ExpenseReceipt[];
}