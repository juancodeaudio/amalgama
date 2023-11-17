type BitacoraBlockProps = {
  children: React.ReactNode
}

const BitacoraBlock = ({children}: BitacoraBlockProps) => {
  return (
    <div className="bg-primary/20 p-5 mx-auto rounded-lg text-primary">
      <h3 className="mt-0 text-primary">BITACORA:</h3>
      {children}
    </div> 
  )
}

export default BitacoraBlock