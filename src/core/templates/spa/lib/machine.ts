// state machine

import { Message } from '../types'
import { viewState } from './props'

export async function machine(msg: Message) {
  // stateless handling
  switch (msg.type) {
    case 'INIT':
      viewState.set('HOME')
      break
  }

  // stateful handling
  switch (viewState.get()) {
  }
}
