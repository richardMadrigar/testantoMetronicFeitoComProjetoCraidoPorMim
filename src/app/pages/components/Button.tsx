import { ReactNode } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"

type PropsBtnPerson = {
  title: string
  icon: ReactNode
  onClick: () => void
}


const ButtonInfo = ({ icon, onClick, title }: PropsBtnPerson) => {



  return (

    <OverlayTrigger
      // onEnter={() => console.log('entrar')}
      // onExit={() => console.log('sair')}

      placement="top"
      overlay={
        <Tooltip >
          <strong>{title}</strong>
        </Tooltip>
      }
    >
      <Button
        className="btn btn-icon btn-active-color-primary btn-sm me-1"
        variant="light"
        onClick={onClick}
      >
        {icon}
      </Button>
    </OverlayTrigger>

  )
}
export default ButtonInfo;