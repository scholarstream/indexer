export const ScholarStreamYieldFactoryAbi = [
  {
    type: "function",
    name: "createPayContract",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vault",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "newContract",
        type: "address",
        internalType: "contract ScholarStreamYield",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getPayContract",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vault",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ScholarStreamYield",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "payContracts",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ScholarStreamYield",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "payContractsArray",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ScholarStreamYield",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "payContractsArrayLength",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ScholarStreamCreated",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "vault",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "scholarStream",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
