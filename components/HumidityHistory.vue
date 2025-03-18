<template>
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Historial de Consultas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Humedad</TableHead>
              <TableHead>Mensaje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(entry, index) in humidityHistory" :key="index">
              <TableCell>{{ entry.date }}</TableCell>
              <TableCell>{{ entry.humidity }}%</TableCell>
              <TableCell>{{ entry.message }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
  import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
  
  defineProps({
    humidityHistory: {
      type: Array,
      required: true
    }
  });
  </script>