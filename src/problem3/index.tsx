interface BoxProps {}

interface WalletBalance {
  currency: string;
  amount: number;
  // should add 'blockchain' field so we can access it in the code which creates sortedBalances
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
  children?: ReactNode 
  // add children to the Props interface in case 
  // it din't have property called 'children' in the BoxProps
}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // the blockchain can has type string because the switch case 
  // function is compare it to some string values
	const getPriority = (blockchain: string): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
      // 'lhsPriority' can't be found anywhere, so we can use 'balancePriority' instead
		  if (balancePriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  // we should also use useMemo for the 'formattedBalances', 
  // so it could keep the update with 'sortedBalances' when 'balances' or 'prices' changes
  const formattedBalances = useMemo(() => {
    sortedBalances.map((balance: WalletBalance) => {
      return {
        // here we use spread operator to assign value for the formatted balance item
        // => should add extend the FormattedWalletBalance from WalletBalance
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  }, [sortedBalances]);

  // we can't use 'sortedBalances' here. Following the map function, each item should have type FormattedWalletBalance
  // and it can access the 'formatted' property. So we should use 'formattedBalances'
  // it can be wrap by useMemo to keep it re-run only the formattedBalances change
  const rows = useMemo(() => formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  }), [formattedBalances])

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

// add export to use it in another components
export default WalletPage