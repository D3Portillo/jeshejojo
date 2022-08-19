import { useNetwork, chain as CHAIN } from "wagmi"

import { getBeautyAddress } from "@/lib/helpers"
import ExternalLink from "@/components/ExternalLink"
import MockBlock from "@/components/MockBlock"

const useBlockExplorer = () => {
  const { chain } = useNetwork()
  const explorer = chain?.blockExplorers || CHAIN.goerli.blockExplorers
  const explorerURL = explorer.default?.url
  function getAddressExplorer(address) {
    return `${explorerURL}/address/${address}`
  }

  function getTxExplorer(tx) {
    return `${explorerURL}/tx/${tx}`
  }

  return {
    getAddressExplorer,
    getTxExplorer,
  }
}

function NavigationTitle({ author, txHash, isMock }) {
  const { getTxExplorer } = useBlockExplorer()
  const prettyAuthor = getBeautyAddress(author)
  return (
    <div className="px-4 h-8 flex items-center justify-between">
      {isMock ? (
        <MockBlock className="h-6 w-32" />
      ) : (
        <span className="text-gray-500 text-sm">
          Posted by
          <ExternalLink className="bg-white" isSelf href={`/address/${author}`}>
            {prettyAuthor}
          </ExternalLink>
        </span>
      )}
      {txHash ? (
        <ExternalLink href={getTxExplorer(txHash)}>
          <span className="hidden sm:inline">View</span> TX
        </ExternalLink>
      ) : (
        <MockBlock className="h-6 w-16" />
      )}
    </div>
  )
}

export default NavigationTitle
