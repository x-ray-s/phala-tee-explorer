import React, { useState, useEffect, useRef } from 'react'
import { Link, Route, Switch, useParams } from "wouter";
import { AppInfo } from './components/AppInfo'
import { Instances } from './components/Workers'
import { KMS } from './components/KMS'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { http } from './lib/utils'
import { useLocation } from "wouter";

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
  return <div className="text-center font-bold text-3xl min-container  flex items-center justify-center">404 Not Found</div>
}

function Home() {
  const [, navigate] = useLocation();
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const appId = e.currentTarget.value;
      navigate(`/${appId}`);
    }
  }
  return <div className="min-container">
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search App Id"
        className="w-full p-3 border border-gray-300 rounded"
        onKeyDown={handleKeyDown}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-2xl">24476</h2>
        <p className="text-gray-500">Compute</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-2xl">1039</h2>
        <p className="text-gray-500">Apps</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-2xl">26551</h2>
        <p className="text-gray-500">Online Workers</p>
      </div>
    </div>
  </div>
}

function App() {

  return (
    <>
      <Nav />

      <div className="space-y-8 container mx-auto py-8 px-5">
        <Switch>
          <Route path="/:id" component={AppInfoPage} />
          <Route path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  )
}

export default App
