# @adelant/react-mautic-forms

A lightweight, flexible React component library for integrating Mautic forms into any React-based project. This library provides easy-to-use components for creating, styling, and handling Mautic form submissions.

[![npm version](https://img.shields.io/npm/v/@adelant/react-mautic-forms.svg)](https://www.npmjs.com/package/@adelant/react-mautic-forms)
[![npm downloads](https://img.shields.io/npm/dm/@adelant/react-mautic-forms.svg)](https://www.npmjs.com/package/@adelant/react-mautic-forms)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 Framework agnostic - works with any React project
- 🧩 Modular components for maximum flexibility
- 📱 Responsive design with customizable styling
- 🔄 Automatic form reset on successful submission
- 📝 TypeScript support with comprehensive type definitions
- ⚡ Optimized for Next.js but works with any React setup

## Installation

```bash
# Using npm
npm install @adelant/react-mautic-forms

# Using yarn
yarn add @adelant/react-mautic-forms

# Using pnpm
pnpm add @adelant/react-mautic-forms

# Using bun
bun add @adelant/react-mautic-forms
```

## Quick Start

```jsx
import {
  MauticForm,
  MauticInput,
  MauticSubmitButton,
  MauticTracking,
  MauticFormScript,
} from "@adelant/react-mautic-forms";

function ContactForm() {
  const handleSuccess = (formData) => {
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* Add these once in your app */}
      <MauticTracking
        mauticURL="https://mautic.example.com/mtc.js"
        tags="example.com"
      />
      <MauticFormScript
        mauticDomain="https://mautic.example.com"
        mauticFormURL="https://mautic.example.com/media/js/mautic-form.js"
      />

      {/* Create your form */}
      <MauticForm
        formId="123"
        formName="contact_form"
        successCallback={handleSuccess}
      >
        <MauticInput
          formName="contact_form"
          name="email"
          label="Email Address"
          type="email"
          required
          validate="email"
        />

        <MauticInput
          formName="contact_form"
          name="message"
          label="Your Message"
          type="textarea"
          required
        />

        <MauticSubmitButton
          formName="contact_form"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send Message
        </MauticSubmitButton>
      </MauticForm>
    </>
  );
}
```

## Usage with Different Frameworks

### Basic React Application

```jsx
import {
  MauticForm,
  MauticInput,
  MauticSubmitButton,
  MauticTracking,
  MauticFormScript,
} from "@adelant/react-mautic-forms";

function App() {
  return (
    <div>
      <MauticTracking
        mauticURL="https://mautic.example.com/mtc.js"
        tags="example.com"
      />
      <MauticFormScript
        mauticDomain="https://mautic.example.com"
        mauticFormURL="https://mautic.example.com/media/js/mautic-form.js"
      />

      <MauticForm formId="1" formName="contact_form">
        <MauticInput
          formName="contact_form"
          name="name"
          label="Your Name"
          required
        />

        <MauticInput
          formName="contact_form"
          name="email"
          label="Email Address"
          type="email"
          required
        />

        <MauticSubmitButton formName="contact_form">Submit</MauticSubmitButton>
      </MauticForm>
    </div>
  );
}
```

### Next.js (Pages Router)

```jsx
// pages/_app.js
import { MauticTracking, MauticFormScript } from '@adelant/react-mautic-forms';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <MauticTracking
        mauticURL="https://mautic.example.com/mtc.js"
        tags="example.com"
      />
      <MauticFormScript
        mauticDomain="https://mautic.example.com"
        mauticFormURL="https://mautic.example.com/media/js/mautic-form.js"
      />
    </>
  );
}

export default MyApp;

// pages/contact.js
import { MauticForm, MauticInput, MauticSubmitButton } from '@adelant/react-mautic-forms';

export default function Contact() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <MauticForm formId="1" formName="contact_form">
        {/* Form fields */}
        <MauticSubmitButton formName="contact_form">Submit</MauticSubmitButton>
      </MauticForm>
    </div>
  );
}
```

### Next.js (App Router)

```jsx
// app/layout.jsx
import { MauticTracking, MauticFormScript } from '@adelant/react-mautic-forms';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <MauticTracking
          mauticURL="https://mautic.example.com/mtc.js"
          tags="example.com"
        />
        <MauticFormScript
          mauticDomain="https://mautic.example.com"
          mauticFormURL="https://mautic.example.com/media/js/mautic-form.js"
        />
      </body>
    </html>
  );
}

// app/contact/page.jsx - Note: Client Component
'use client';

import { MauticForm, MauticInput, MauticSubmitButton } from '@adelant/react-mautic-forms';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <MauticForm formId="1" formName="contact_form">
        <MauticInput
          formName="contact_form"
          name="email"
          label="Email"
          type="email"
          required
        />
        <MauticSubmitButton formName="contact_form">Submit</MauticSubmitButton>
      </MauticForm>
    </div>
  );
}
```

## Component API

### MauticForm

Main container for Mautic forms that handles form submission and notifications.

```jsx
<MauticForm
  formId="123" // Required: Mautic form ID
  formName="contact_form" // Required: Unique form name
  action="https://mautic.example.com/form/submit" // Optional: Custom submission URL
  successCallback={(formData) => {}} // Optional: Function called on successful submission
  errorCallback={(error, formData) => {}} // Optional: Function called on error
  className="my-form" // Optional: CSS class for the wrapper
>
  {/* Form elements go here */}
</MauticForm>
```

### MauticInput

Component for creating various form input types.

```jsx
<MauticInput
  formName="contact_form" // Required: Must match parent MauticForm's formName
  name="email" // Required: Field name
  label="Email Address" // Optional: Input label
  type="email" // Optional: Input type (default: "text") or "textarea"
  component="input" // Optional: "input" or "textarea". Defaults to inferring from type.
  required={true} // Optional: Mark field as required
  validate="email" // Optional: Validation type
  validationType="email" // Optional: Additional validation params
  className="custom-input" // Optional: CSS classes
  errorMessage="Valid email required" // Optional: Custom error message
  placeholder="Enter your email" // Optional: Placeholder text
  autocomplete="email" // Optional: Autocomplete attribute
  // ...other standard input/textarea props (onChange, onBlur, etc.)
/>
```

Supported input types: `text`, `email`, `tel`, `number`, `date`, `textarea`, and others supported by HTML input.

### MauticSubmitButton

Customizable submit button for the form.

```jsx
<MauticSubmitButton
  formName="contact_form" // Required: Must match parent MauticForm's formName
  className="submit-button" // Optional: CSS classes
  // ...other standard button props (disabled, onClick, etc.)
>
  Send Message // Button text/content
</MauticSubmitButton>
```

### MauticTracking

Adds Mautic tracking to your application. Include this once, typically in your app layout.

```jsx
<MauticTracking
  mauticURL="https://mautic.example.com/mtc.js"
  tags="example.com"
  enabled={true} // Optional: Explicitly enable/disable tracking. Defaults to !dev
/>
```

## Custom Hooks (Headless Usage)

### useMauticForm

If you need complete control over the form rendering and logic, you can use the `useMauticForm` hook.

```jsx
import { useMauticForm } from "@adelant/react-mautic-forms";

function MyCustomForm() {
  const { handleSubmit, isSubmitting, error } = useMauticForm({
    formId: "123",
    formName: "contact_form",
    action: "https://mautic.example.com/form/submit",
    successCallback: (formData) => console.log("Success!", formData),
    errorCallback: (err) => console.error("Error!", err),
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="mauticform[email]" type="email" required />
      
      {/* Required hidden fields for Mautic */}
      <input type="hidden" name="mauticform[formId]" value="123" />
      <input type="hidden" name="mauticform[return]" value="" />
      <input type="hidden" name="mauticform[formName]" value="contact_form" />

      <button disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>

      {error && <div className="error">{error.message}</div>}
    </form>
  );
}
```

### MauticFormScript

Adds the Mautic form handler script to your application. Include this once, typically in your app layout.

```jsx
<MauticFormScript
  mauticDomain="https://mautic.example.com"
  mauticFormURL="https://mautic.example.com/media/js/mautic-form.js"
/>
```

## Advanced Usage

### Custom Form Styling

All components accept `className` props for styling with Tailwind CSS, CSS modules, or any CSS framework.

```jsx
<MauticForm
  formId="1"
  formName="contact_form"
  className="bg-gray-100 p-6 rounded-lg shadow-md"
>
  <MauticInput
    formName="contact_form"
    name="email"
    label="Email"
    className="mb-4 border-gray-300 focus:ring-blue-500"
  />

  <MauticSubmitButton
    formName="contact_form"
    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
  >
    Submit
  </MauticSubmitButton>
</MauticForm>
```

### Form Submission Handling

Customize what happens after successful form submission:

```jsx
<MauticForm
  formId="1"
  formName="contact_form"
  successCallback={(formData) => {
    // Access form data
    console.log("Form data:", formData);

    // Track event with analytics
    window.gtag?.("event", "form_submission", {
      form_name: "contact_form",
    });

    // Navigate to thank you page
    router.push("/thank-you");
  }}
>
  {/* Form fields */}
</MauticForm>
```

### Custom Mautic Instance

You can use a custom Mautic instance by configuring the endpoint URL:

```jsx
<MauticForm
  formId="1"
  formName="contact_form"
  action="https://your-mautic-instance.com/form/submit"
>
  {/* Form fields */}
</MauticForm>
```

## TypeScript Support

This library includes comprehensive TypeScript definitions. Import types directly:

```tsx
import { MauticFormProps, MauticInputProps } from "@adelant/react-mautic-forms";

const CustomInput = ({ ...props }: MauticInputProps) => {
  return <MauticInput {...props} className="custom-styled-input" />;
};
```

## Browser Support

- Chrome, Firefox, Safari, Edge: latest 2 versions
- IE: Not supported

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Developed and maintained by [Adelant](https://adelant.com)
- Built with [Bun](https://bun.sh) and TypeScript
