// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct Jeshe {
    string content;
    bytes6 bgColor;
    bytes6 textColor;
    address author;
    address owner;
}

contract MeinJokes {
    uint64 nextItemIdx;
    mapping(uint64 => Jeshe) itemsById;
    mapping(address => uint64[]) itemsByOwner;

    event ListedItem(address indexed owner, uint64 indexed item_id);

    function totalItems() external view returns (uint64) {
        return nextItemIdx;
    }

    function getItemById(uint64 _itemId) external view returns (Jeshe memory) {
        return itemsById[_itemId];
    }

    function getItemsByOwner(address _owner)
        external
        view
        returns (uint64[] memory)
    {
        return itemsByOwner[_owner];
    }

    function listItem(
        string calldata _content,
        bytes6 _bgColor,
        bytes6 _textColor
    ) external {
        // At first :: owner = author = msg.sender
        itemsById[nextItemIdx] = Jeshe(
            _content,
            _bgColor,
            _textColor,
            msg.sender,
            msg.sender
        );
        emit ListedItem(msg.sender, nextItemIdx);
        itemsByOwner[msg.sender].push(nextItemIdx++);
    }
}
