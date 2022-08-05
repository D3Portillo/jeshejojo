// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct Jeshe {
    bytes6 bgColor;
    bytes6 textColor;
    address author;
    string content;
}

contract MeinJokes {
    uint64 nextItemIdx;
    mapping(uint64 => Jeshe) itemsById;

    event ListedItem(address indexed owner, uint64 indexed item_id);

    function totalItems() external view returns (uint64) {
        return nextItemIdx;
    }

    function getItemById(uint64 _itemId) external view returns (Jeshe memory) {
        return itemsById[_itemId];
    }

    function listItem(
        string calldata _content,
        bytes6 _bgColor,
        bytes6 _textColor
    ) external notEmptyOrGt200(_content) returns (uint64) {
        itemsById[nextItemIdx] = Jeshe(
            _bgColor,
            _textColor,
            msg.sender,
            _content
        );
        emit ListedItem(msg.sender, nextItemIdx);
        return nextItemIdx++;
    }

    // MODIFIERS
    modifier notEmptyOrGt200(string calldata _str) {
        bytes memory _rawBytes = bytes(_str);
        require(_rawBytes.length > 0, "String cannot be empty");
        require(_rawBytes.length < 222, "String.size cannot greater than 200");
        _;
    }
}
