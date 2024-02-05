"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Checkpoint() {
  const [pin, setPin] = useState<string>("");

  const _updatePin = (value: string) => {
    if (value === "") {
      return setPin("");
    }
    const newPin: number = parseInt(value);
    if (0 <= newPin && newPin < 1e6 && newPin.toString() === value) {
      setPin(value);
    }
  };

  const _submitPin = async () => {
    // TODO: send api request to update statistics based on given PIN
    console.log(pin);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkpoint</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Input
          type="number"
          value={pin}
          placeholder="PIN"
          className="w-full"
          onChange={(e) => {
            _updatePin(e.target.value);
          }}
        />
        <Button onClick={_submitPin} className="w-full">
          Confirm
        </Button>
      </CardContent>
    </Card>
  );
}
