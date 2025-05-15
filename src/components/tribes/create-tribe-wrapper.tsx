import CreateTribeButton from '../CustomButton/create-tribe-button'
import CreateTribeIcon from '../Icons/CreateTribeIcon'

export default function CreateTribeWrapper() {
  return (
    <div className="my-[60px] flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <CreateTribeIcon />
        <p className="py-[8px] text-[13px] text-muted-foreground/50">
          You are yet to create your Tribe
        </p>
        <CreateTribeButton label="Create a tribe" />
      </div>
    </div>
  )
}
