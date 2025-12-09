import React from "react";
import { Wallet } from "lucide-react";

const WalletContent = ({ balance, transactions }) => {
  return (
    <div className="space-y-3">
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Balance</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{balance} Points</p>
        </div>
      </div>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <Wallet size={20} className="text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">{transaction.type}</h4>
                <p className="text-sm text-gray-500 mt-1">{transaction.reason}</p>
                <p className="text-xs text-gray-400 mt-1">{transaction.date}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-green-600">
              {transaction.amount}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletContent;
