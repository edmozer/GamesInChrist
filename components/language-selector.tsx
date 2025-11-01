'use client';

import { Button } from "./ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { Globe } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => {
            setLanguage('pt');
            setIsOpen(false);
          }}
        >
          🇧🇷 Português
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            setLanguage('en');
            setIsOpen(false);
          }}
        >
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}