import { Button, Card, CardContent, CardHeader, Divider, Stack, TextField } from "@mui/material";

export default function Login() {
  return (
    <main className="p-4 flex flex-col items-center">
      <Card className="min-w-96">
        <CardHeader
          className="flex flex-col items-center"
          title="Login to Event Run"
        />
        <CardContent>
          <Stack className="space-y-4">
            <TextField label="Email" type="email" />
            <TextField label="Password" type="password" />
            <Button variant="outlined">
              Login
            </Button>
            <Divider />
            <Button variant="contained" className="bg-blue-500">
              Continue with Google
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </main>
  )
}