import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Expense } from 'src/expense/models/expense.model';

@Table({ tableName: 'expense_categories' })
export class ExpenseCategory extends Model<ExpenseCategory> {

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    declare userId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING })
    declare icon: string;

    @HasMany(() => Expense)
    expenses: Expense[];

    @Column({ type: DataType.STRING })
    declare description: string;

    @BelongsTo(() => User)
    user: User;
}
