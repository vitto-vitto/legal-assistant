import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid'
import { Transaction } from '../types'

interface Stat {
  name: string;
  stat: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

const stats: Stat[] = [
  {
    name: 'Total Balance',
    stat: '$71,897',
    change: '12%',
    changeType: 'increase',
  },
  {
    name: 'Monthly Income',
    stat: '$4,500',
    change: '2.1%',
    changeType: 'increase',
  },
  {
    name: 'Monthly Expenses',
    stat: '$2,300',
    change: '4.3%',
    changeType: 'decrease',
  },
]

const transactions: Partial<Transaction>[] = [
  {
    id: '1',
    description: 'Grocery Shopping',
    amount: -120.50,
    date: '2025-03-05',
    category: 'Food',
    type: 'EXPENSE',
  },
  {
    id: '2',
    description: 'Salary',
    amount: 4500.00,
    date: '2025-03-01',
    category: 'Income',
    type: 'INCOME',
  },
  {
    id: '3',
    description: 'Internet Bill',
    amount: -89.99,
    date: '2025-03-03',
    category: 'Utilities',
    type: 'EXPENSE',
  },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Dashboard
      </h2>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <p className="truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-xl font-semibold leading-6 text-gray-900">Recent Transactions</h3>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Add Transaction
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {transaction.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.category}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.date}</td>
                        <td className={classNames(
                          'whitespace-nowrap px-3 py-4 text-sm text-right',
                          transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                        )}>
                          ${Math.abs(transaction.amount || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
