import { FilterStatus } from '@/@types/FilterStatus'
import { CircleDashed, CircleCheck } from "lucide-react-native";
 

export function StatusIcon({ status }: { status: FilterStatus }){ // Aqui há uma tipagem INLINE, diz que o "status" é o "FilterStatus", que criamos em '@types'
    return status === FilterStatus.DONE ? (
        <CircleCheck size={18} color="#2C46B1" />
      ) : (    
        <CircleDashed size={18} color="#000000" />
      )
}