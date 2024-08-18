export const raffleAbi = [
  {
    inputs: [
      { internalType: 'address', name: '_feeAddress', type: 'address' },
      {
        internalType: 'address',
        name: '_randomGeneratorAddress',
        type: 'address',
      },
      {
        internalType: 'contract IReferral',
        name: '_referral',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes32', name: 'neededRole', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethPerTicket',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
    ],
    name: 'AddTimePool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'round',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isFinished',
        type: 'bool',
      },
    ],
    name: 'ClosePool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'round',
        type: 'uint256',
      },
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'DepositTimePool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'round',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolSize',
        type: 'uint256',
      },
    ],
    name: 'DrawAndReopenTimePool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newFeeAddress',
        type: 'address',
      },
    ],
    name: 'SetFeeAddress',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'OPERATOR_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_totalStakedAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_ethPerTicket', type: 'uint256' },
      { internalType: 'uint256', name: '_startTmime', type: 'uint256' },
      { internalType: 'uint256', name: '_duration', type: 'uint256' },
      { internalType: 'uint256', name: '_feeBPS', type: 'uint256' },
    ],
    name: 'addTimePool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'closePool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_id', type: 'uint256' },
      { internalType: 'address', name: '_referrer', type: 'address' },
    ],
    name: 'depositTimePool',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'drawAndReopenTimePool',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_id', type: 'uint256' },
      { internalType: 'uint256', name: '_totalStakedAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_startTime', type: 'uint256' },
      { internalType: 'uint256', name: '_ethPerTicket', type: 'uint256' },
      { internalType: 'uint256', name: '_poolSize', type: 'uint256' },
      { internalType: 'uint256', name: '_duration', type: 'uint256' },
      { internalType: 'uint256', name: '_feeBPS', type: 'uint256' },
      { internalType: 'bool', name: '_bool', type: 'bool' },
    ],
    name: 'editPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWinningPools',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'poolType', type: 'bool' },
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'uint256', name: 'round', type: 'uint256' },
          { internalType: 'uint256', name: 'ethPerTicket', type: 'uint256' },
          { internalType: 'uint256', name: 'poolSize', type: 'uint256' },
          { internalType: 'address', name: 'winner', type: 'address' },
        ],
        internalType: 'struct wtfRaffleContract.WinningPool[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'randomGenerator',
    outputs: [
      {
        internalType: 'contract IRandomNumberGenerator',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referral',
    outputs: [
      { internalType: 'contract IReferral', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'callerConfirmation', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_feeAddress', type: 'address' }],
    name: 'setFeeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'stakedAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'timePool',
    outputs: [
      { internalType: 'uint256', name: 'totalStakedAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'actualPoolSize', type: 'uint256' },
      { internalType: 'uint256', name: 'ethPerTicket', type: 'uint256' },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'duration', type: 'uint256' },
      { internalType: 'uint256', name: 'round', type: 'uint256' },
      { internalType: 'bool', name: 'isFinished', type: 'bool' },
      { internalType: 'uint256', name: 'requestId', type: 'uint256' },
      { internalType: 'uint256', name: 'feeBPS', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'timePoolLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'userInfo',
    outputs: [
      { internalType: 'uint256', name: 'point', type: 'uint256' },
      { internalType: 'uint256', name: 'lastPointBlock', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'winningPools',
    outputs: [
      { internalType: 'bool', name: 'poolType', type: 'bool' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'round', type: 'uint256' },
      { internalType: 'uint256', name: 'ethPerTicket', type: 'uint256' },
      { internalType: 'uint256', name: 'poolSize', type: 'uint256' },
      { internalType: 'address', name: 'winner', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'winningPoolsLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]

export const coinflipAbi = [
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'admins',
        type: 'address[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32',
      },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address payable',
            name: 'player',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'betAmount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'playerChoice',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'draw',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct CoinFlip.Round',
        name: 'round',
        type: 'tuple',
      },
    ],
    name: 'Flip',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'PlayerByAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'round',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'betAmount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'betChoice',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'betResult',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'winningAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allBets',
    outputs: [
      {
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'round',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'betAmount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'betChoice',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'betResult',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'winningAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_playerChoice',
        type: 'bool',
      },
    ],
    name: 'flip',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllBets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'player',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'round',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'betAmount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'betChoice',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'betResult',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'winningAmount',
            type: 'uint256',
          },
        ],
        internalType: 'struct CoinFlip.Bet[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'playerAddress',
        type: 'address',
      },
    ],
    name: 'getPlayerBets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'player',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'round',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'betAmount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'betChoice',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'betResult',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'winningAmount',
            type: 'uint256',
          },
        ],
        internalType: 'struct CoinFlip.Bet[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'loadFunds',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxPoolBetRatio',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'roundId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'royalty',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_maxPoolBetRatio',
        type: 'uint16',
      },
    ],
    name: 'setMaxPoolBetRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_royalty',
        type: 'uint16',
      },
    ],
    name: 'setRoyalty',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalVolume',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

export const spinWheelAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'FreeSpin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'PaidSpin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethAmount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawReward',
    type: 'event',
  },
  {
    inputs: [],
    name: 'freeSpinCooldown',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'freeSpinHistory',
    outputs: [
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'freeSpinRewards',
    outputs: [
      { internalType: 'uint256', name: 'points', type: 'uint256' },
      { internalType: 'uint256', name: 'probability', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEthPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getUserFreeSpinHistory',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'reward', type: 'uint256' },
        ],
        internalType: 'struct SpinWheel.SpinHistory[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    name: 'getUserFreeSpinOdds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getUserPaidSpinHistory',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'reward', type: 'uint256' },
        ],
        internalType: 'struct SpinWheel.SpinHistory[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    name: 'getUserPaidSpinOdds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getUserWtfPoints',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'isFreeSpin',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'lastFreeSpinTime',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minimumEthBalanceForFreeSpin',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'paidSpinHistory',
    outputs: [
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'paidSpinRewards',
    outputs: [
      { internalType: 'uint256', name: 'points', type: 'uint256' },
      { internalType: 'uint256', name: 'probability', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'setMinimumEthBalanceForFreeSpin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_price', type: 'uint256' }],
    name: 'setSpinPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_freeSpincoolDown', type: 'uint256' },
    ],
    name: 'setfreeSpinCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'spinFree',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'spinPaid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'spinPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'userEthRewards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'userFreeSpinOdds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'userPaidSpinOdds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'userWtfPoints',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]

export const jackpotAbi = [{ "inputs": [{ "components": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "uint40", "name": "maximumNumberOfDepositsPerRound", "type": "uint40" }, { "internalType": "uint40", "name": "maximumNumberOfParticipantsPerRound", "type": "uint40" }, { "internalType": "uint40", "name": "roundDuration", "type": "uint40" }, { "internalType": "uint256", "name": "valuePerEntry", "type": "uint256" }, { "internalType": "address", "name": "protocolFeeRecipient", "type": "address" }, { "internalType": "uint16", "name": "protocolFeeBp", "type": "uint16" }, { "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }, { "internalType": "uint64", "name": "subscriptionId", "type": "uint64" }, { "internalType": "address", "name": "vrfCoordinator", "type": "address" }, { "internalType": "address", "name": "reservoirOracle", "type": "address" }, { "internalType": "address", "name": "transferManager", "type": "address" }, { "internalType": "address", "name": "erc20Oracle", "type": "address" }, { "internalType": "address", "name": "weth", "type": "address" }, { "internalType": "uint40", "name": "signatureValidityPeriod", "type": "uint40" }], "internalType": "struct IYolo.ConstructorCalldata", "name": "params", "type": "tuple" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "AccessControlBadConfirmation", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "bytes32", "name": "neededRole", "type": "bytes32" }], "name": "AccessControlUnauthorizedAccount", "type": "error" }, { "inputs": [], "name": "AlreadyWithdrawn", "type": "error" }, { "inputs": [], "name": "CutoffTimeNotReached", "type": "error" }, { "inputs": [], "name": "DrawExpirationTimeNotReached", "type": "error" }, { "inputs": [], "name": "ERC20TransferFail", "type": "error" }, { "inputs": [], "name": "ERC721TransferFromFail", "type": "error" }, { "inputs": [], "name": "InsufficientParticipants", "type": "error" }, { "inputs": [], "name": "InvalidCollection", "type": "error" }, { "inputs": [], "name": "InvalidCurrency", "type": "error" }, { "inputs": [], "name": "InvalidIndex", "type": "error" }, { "inputs": [], "name": "InvalidLength", "type": "error" }, { "inputs": [], "name": "InvalidRoundDuration", "type": "error" }, { "inputs": [], "name": "InvalidStatus", "type": "error" }, { "inputs": [], "name": "InvalidTokenType", "type": "error" }, { "inputs": [], "name": "InvalidValue", "type": "error" }, { "inputs": [], "name": "IsPaused", "type": "error" }, { "inputs": [], "name": "MaximumNumberOfDepositsReached", "type": "error" }, { "inputs": [], "name": "MessageIdInvalid", "type": "error" }, { "inputs": [], "name": "NotAContract", "type": "error" }, { "inputs": [], "name": "NotDepositor", "type": "error" }, { "inputs": [], "name": "NotOperator", "type": "error" }, { "inputs": [], "name": "NotOwner", "type": "error" }, { "inputs": [], "name": "NotPaused", "type": "error" }, { "inputs": [], "name": "NotWinner", "type": "error" }, { "inputs": [], "name": "NullSignerAddress", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "have", "type": "address" }, { "internalType": "address", "name": "want", "type": "address" }], "name": "OnlyCoordinatorCanFulfill", "type": "error" }, { "inputs": [], "name": "ProtocolFeeNotPaid", "type": "error" }, { "inputs": [], "name": "RandomnessRequestAlreadyExists", "type": "error" }, { "inputs": [], "name": "ReentrancyFail", "type": "error" }, { "inputs": [], "name": "RoundCannotBeClosed", "type": "error" }, { "inputs": [], "name": "SignatureEOAInvalid", "type": "error" }, { "inputs": [], "name": "SignatureERC1271Invalid", "type": "error" }, { "inputs": [], "name": "SignatureExpired", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "name": "SignatureLengthInvalid", "type": "error" }, { "inputs": [], "name": "SignatureParameterSInvalid", "type": "error" }, { "inputs": [{ "internalType": "uint8", "name": "v", "type": "uint8" }], "name": "SignatureParameterVInvalid", "type": "error" }, { "inputs": [], "name": "ZeroDeposits", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address[]", "name": "currencies", "type": "address[]" }, { "indexed": false, "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "CurrenciesStatusUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "depositor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "entriesCount", "type": "uint256" }], "name": "Deposited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "depositor", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "depositIndices", "type": "uint256[]" }], "name": "DepositsWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "erc20Oracle", "type": "address" }], "name": "ERC20OracleUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint40", "name": "maximumNumberOfDepositsPerRound", "type": "uint40" }], "name": "MaximumNumberOfDepositsPerRoundUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint40", "name": "maximumNumberOfParticipantsPerRound", "type": "uint40" }], "name": "MaximumNumberOfParticipantsPerRoundUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "winner", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "prizeIndices", "type": "uint256[]" }], "name": "PrizesClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint16", "name": "protocolFeeBp", "type": "uint16" }], "name": "ProtocolFeeBpUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "protocolFeeRecipient", "type": "address" }], "name": "ProtocolFeeRecipientUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "requestId", "type": "uint256" }], "name": "RandomnessRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "reservoirOracle", "type": "address" }], "name": "ReservoirOracleUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint40", "name": "roundDuration", "type": "uint40" }], "name": "RoundDurationUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "enum IYolo.RoundStatus", "name": "status", "type": "uint8" }], "name": "RoundStatusUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint40", "name": "signatureValidityPeriod", "type": "uint40" }], "name": "SignatureValidityPeriodUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "valuePerEntry", "type": "uint256" }], "name": "ValuePerEntryUpdated", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_PROTOCOL_FEE_BP", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "OPERATOR_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SUBSCRIPTION_ID", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cancel", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "cancelAfterRandomnessRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "enum IYolo.TokenType", "name": "tokenType", "type": "uint8" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIdsOrAmounts", "type": "uint256[]" }, { "components": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes", "name": "payload", "type": "bytes" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct IYolo.ReservoirOracleFloorPrice", "name": "reservoirOracleFloorPrice", "type": "tuple" }], "internalType": "struct IYolo.DepositCalldata[]", "name": "deposits", "type": "tuple[]" }], "name": "cancelCurrentRoundAndDepositToTheNextRound", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "internalType": "uint256[]", "name": "prizeIndices", "type": "uint256[]" }], "internalType": "struct IYolo.ClaimPrizesCalldata[]", "name": "claimPrizesCalldata", "type": "tuple[]" }], "name": "claimPrizes", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "components": [{ "internalType": "enum IYolo.TokenType", "name": "tokenType", "type": "uint8" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIdsOrAmounts", "type": "uint256[]" }, { "components": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes", "name": "payload", "type": "bytes" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct IYolo.ReservoirOracleFloorPrice", "name": "reservoirOracleFloorPrice", "type": "tuple" }], "internalType": "struct IYolo.DepositCalldata[]", "name": "deposits", "type": "tuple[]" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "depositCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "drawWinner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "erc20Oracle", "outputs": [{ "internalType": "contract IPriceOracle", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "internalType": "uint256[]", "name": "prizeIndices", "type": "uint256[]" }], "internalType": "struct IYolo.ClaimPrizesCalldata[]", "name": "claimPrizesCalldata", "type": "tuple[]" }], "name": "getClaimPrizesPaymentRequired", "outputs": [{ "internalType": "uint256", "name": "protocolFeeOwed", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "name": "getDeposits", "outputs": [{ "components": [{ "internalType": "enum IYolo.TokenType", "name": "tokenType", "type": "uint8" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "address", "name": "depositor", "type": "address" }, { "internalType": "bool", "name": "withdrawn", "type": "bool" }, { "internalType": "uint40", "name": "currentEntryIndex", "type": "uint40" }], "internalType": "struct IYolo.Deposit[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isCurrencyAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maximumNumberOfDepositsPerRound", "outputs": [{ "internalType": "uint40", "name": "", "type": "uint40" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maximumNumberOfParticipantsPerRound", "outputs": [{ "internalType": "uint40", "name": "", "type": "uint40" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "prices", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "protocolFeeBp", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "protocolFeeRecipient", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "randomnessRequests", "outputs": [{ "internalType": "bool", "name": "exists", "type": "bool" }, { "internalType": "uint40", "name": "roundId", "type": "uint40" }, { "internalType": "uint256", "name": "randomWord", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "requestId", "type": "uint256" }, { "internalType": "uint256[]", "name": "randomWords", "type": "uint256[]" }], "name": "rawFulfillRandomWords", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "callerConfirmation", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reservoirOracle", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "roundDuration", "outputs": [{ "internalType": "uint40", "name": "", "type": "uint40" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rounds", "outputs": [{ "internalType": "enum IYolo.RoundStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "winner", "type": "address" }, { "internalType": "uint40", "name": "cutoffTime", "type": "uint40" }, { "internalType": "uint40", "name": "drawnAt", "type": "uint40" }, { "internalType": "uint40", "name": "numberOfParticipants", "type": "uint40" }, { "internalType": "uint40", "name": "maximumNumberOfDeposits", "type": "uint40" }, { "internalType": "uint40", "name": "maximumNumberOfParticipants", "type": "uint40" }, { "internalType": "uint16", "name": "protocolFeeBp", "type": "uint16" }, { "internalType": "uint256", "name": "protocolFeeOwed", "type": "uint256" }, { "internalType": "uint256", "name": "valuePerEntry", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "roundsCount", "outputs": [{ "internalType": "uint40", "name": "", "type": "uint40" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "signatureValidityPeriod", "outputs": [{ "internalType": "uint40", "name": "", "type": "uint40" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "togglePaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "currencies", "type": "address[]" }, { "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "updateCurrenciesStatus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_erc20Oracle", "type": "address" }], "name": "updateERC20Oracle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint40", "name": "_maximumNumberOfDepositsPerRound", "type": "uint40" }], "name": "updateMaximumNumberOfDepositsPerRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint40", "name": "_maximumNumberOfParticipantsPerRound", "type": "uint40" }], "name": "updateMaximumNumberOfParticipantsPerRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_protocolFeeBp", "type": "uint16" }], "name": "updateProtocolFeeBp", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_protocolFeeRecipient", "type": "address" }], "name": "updateProtocolFeeRecipient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_reservoirOracle", "type": "address" }], "name": "updateReservoirOracle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint40", "name": "_roundDuration", "type": "uint40" }], "name": "updateRoundDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint40", "name": "_signatureValidityPeriod", "type": "uint40" }], "name": "updateSignatureValidityPeriod", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_valuePerEntry", "type": "uint256" }], "name": "updateValuePerEntry", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "valuePerEntry", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "internalType": "uint256[]", "name": "depositIndices", "type": "uint256[]" }], "name": "withdrawDeposits", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

export const ethPriceFeedAbi = [
  {
    inputs: [
      { internalType: 'address', name: '_aggregator', type: 'address' },
      { internalType: 'address', name: '_accessController', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'int256',
        name: 'current',
        type: 'int256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roundId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'updatedAt',
        type: 'uint256',
      },
    ],
    name: 'AnswerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roundId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'startedBy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startedAt',
        type: 'uint256',
      },
    ],
    name: 'NewRound',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'OwnershipTransferRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'accessController',
    outputs: [
      {
        internalType: 'contract AccessControllerInterface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'aggregator',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_aggregator', type: 'address' }],
    name: 'confirmAggregator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_roundId', type: 'uint256' }],
    name: 'getAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_roundId', type: 'uint256' }],
    name: 'getTimestamp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRound',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestTimestamp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    name: 'phaseAggregators',
    outputs: [
      {
        internalType: 'contract AggregatorV2V3Interface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'phaseId',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_aggregator', type: 'address' }],
    name: 'proposeAggregator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proposedAggregator',
    outputs: [
      {
        internalType: 'contract AggregatorV2V3Interface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'proposedGetRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proposedLatestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_accessController', type: 'address' },
    ],
    name: 'setController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_to', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

export const oracleAbi = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

export const lrtOracleAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AssetNotSupported', type: 'error' },
  { inputs: [], name: 'CallerNotLRTConfigAdmin', type: 'error' },
  { inputs: [], name: 'ZeroAddressNotAllowed', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'priceOracle',
        type: 'address',
      },
    ],
    name: 'AssetPriceOracleUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'lrtConfig',
        type: 'address',
      },
    ],
    name: 'UpdatedLRTConfig',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
    name: 'assetPriceOracle',
    outputs: [
      { internalType: 'address', name: 'priceOracle', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
    name: 'getAssetPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lrtConfigAddr', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lrtConfig',
    outputs: [
      { internalType: 'contract ILRTConfig', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'primeETHPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lrtConfigAddr', type: 'address' },
    ],
    name: 'updateLRTConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'address', name: 'priceOracle', type: 'address' },
    ],
    name: 'updatePriceOracleFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'updatePrimeETHPrice',
    outputs: [{ internalType: 'uint256', name: 'price_', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const primeETHABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'CallerNotLRTConfigAdmin', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'role', type: 'string' }],
    name: 'CallerNotLRTConfigAllowedRole',
    type: 'error',
  },
  { inputs: [], name: 'CallerNotLRTConfigManager', type: 'error' },
  { inputs: [], name: 'ZeroAddressNotAllowed', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'lrtConfig',
        type: 'address',
      },
    ],
    name: 'UpdatedLRTConfig',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'admin', type: 'address' },
      { internalType: 'address', name: 'lrtConfigAddr', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lrtConfig',
    outputs: [
      { internalType: 'contract ILRTConfig', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_lrtConfig', type: 'address' }],
    name: 'updateLRTConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]