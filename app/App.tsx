import { useState, useEffect, useRef } from 'react'
import { Link, Route, Switch, useParams } from "wouter";
import { AppInfo } from './components/AppInfo'
import { Instances } from './components/Workers'
import { KMS } from './components/KMS'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { http } from './lib/utils'

function AppInfoPage() {
  const [app, setApp] = useState<AppData>()
  const [kms, setKms] = useState<KMS>()
  const { id } = useParams<{ id: string }>()
  useEffect(() => {
    http('/').then(setApp)
    http('/kms').then(setKms)
  }, [id])
  return <>
    <AppInfo data={app} id={id} />
    <Instances data={app} />
    <KMS data={kms} />
  </>
}

function NotFound() {
  return <div className="text-center font-bold text-3xl h-[300px] flex items-center justify-center">404 Not Found</div>
}

function App() {

  return (
    <>
      <Nav />

      <div className="space-y-8 container mx-auto py-8 px-5">
        <Switch>
          <Route path="/:id" component={AppInfoPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  )
}

export default App
