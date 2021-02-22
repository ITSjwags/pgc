import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toTitleCase } from '../utils'

const IndexPage = () => {
  const [formStatus, setFormStatus] = useState({ type: 'initial', message: '' })
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    if (formStatus.type === 'sent') {
      setTimeout(() => {
        setFormStatus({ type: 'initial', message: '' })
        setFormValues({})
      }, 2000)
    }
  }, [formStatus])

  function handleInputChange(e) {
    const { name, value } = e.target
    const formattedValue = name === 'name' ? toTitleCase(value) : value
    setFormValues((prev) => ({ ...prev, [name]: formattedValue }))

    if (formStatus.type === 'error') {
      setFormStatus({ type: 'initial', message: '' })
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setFormStatus({ type: 'pending' })
    try {
      const response = await axios.post('.netlify/functions/signup', { formValues })
      // fake a little delay for ux
      if (response.data === 'Email already exists.') {
        return setFormStatus({ type: 'error', message: 'Email already exists.' })
      }
      setTimeout(() => {
        setFormStatus({ type: 'sent' })
      }, 1000)
    } catch (error) {
      setFormStatus({ type: 'error', message: error })
      console.error('submission error:', error)
    }
  }

  function getButtonText() {
    switch (formStatus.type) {
      case 'pending':
        return 'sending email...'
      case 'sent':
        return 'email sent!'
      default:
        return 'Sign up'
    }
  }

  return (
    <>
      <header>
        <h1>PGC</h1>
      </header>
      <main>
        {formStatus.type === 'error' && <p>{formStatus.message}</p>}

        <form onSubmit={onSubmit}>
          <input
            name="name"
            onChange={handleInputChange}
            placeholder="Enter full name"
            required
            type="text"
            value={formValues.name || ''}
          />
          <input
            name="email"
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
            type="email"
            value={formValues.email || ''}
          />
          <input
            name="phone"
            onChange={handleInputChange}
            placeholder="Enter phone number"
            type="phone"
            value={formValues.phone || ''}
          />
          <input
            name="instagram"
            onChange={handleInputChange}
            placeholder="@instagram"
            type="text"
            value={formValues.instagram || ''}
          />
          <input
            name="ghin"
            onChange={handleInputChange}
            placeholder="Enter ghin number"
            type="number"
            value={formValues.ghin || ''}
          />
          <input
            name="venmo"
            onChange={handleInputChange}
            placeholder="@venmo"
            type="text"
            value={formValues.venmo || ''}
          />
          <button type="submit">{getButtonText()}</button>
        </form>
      </main>
    </>
  )
}

export default IndexPage
