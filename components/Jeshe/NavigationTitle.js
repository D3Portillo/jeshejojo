import ExternalLink from "@/components/ExternalLink"
import MockBlock from "@/components/MockBlock"

function NavigationTitle({ author, txHash, isMock }) {
  const prettyAuthor = getBeautyAddress(author)
  return (
    <div className="px-4 h-8 flex items-center justify-between">
      {isMock ? (
        <MockBlock className="h-6 w-32" />
      ) : (
        <span className="text-gray-500 text-sm">
          Posted by
          <ExternalLink
            className="bg-white"
            href={`https://goerli.etherscan.io/address/${author}`}
          >
            {prettyAuthor}
          </ExternalLink>
        </span>
      )}
      {isMock ? (
        <MockBlock className="h-6 w-16" />
      ) : (
        <ExternalLink href={`https://goerli.etherscan.io/tx/${txHash}`}>
          <span className="hidden sm:inline">View</span> TX
        </ExternalLink>
      )}
    </div>
  )
}

function getBeautyAddress(address = "") {
  if (!address) return "N/A"
  return `${address.substr(0, 4)}...${address.substr(-4, 4)}`
}

export default NavigationTitle
