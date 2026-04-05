<!-- TimeCalculator.vue -->
<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h1 class="text-xl font-semibold text-gray-800">
                Time Difference Calculator
            </h1>

            <!-- Inputs -->
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Start time
                    </label>
                    <input
                        v-model="start"
                        type="time"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        End time
                    </label>
                    <input
                        v-model="end"
                        type="time"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <!-- Result -->
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-500">Elapsed time</p>

                <p class="text-2xl font-semibold text-gray-900">
                    {{ formattedResult }}
                </p>
            </div>

            <!-- Helper -->
            <p class="text-xs text-gray-500">
                If end time is smaller than start time, midnight crossing is assumed.
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";

const start = ref("");
const end = ref("");

function parseTime(value) {
    if (!value) return null;

    const [hours, minutes] = value.split(":").map(Number);

    return (hours * 60) + minutes;
}

const elapsedMinutes = computed(() => {
    const startMinutes = parseTime(start.value);
    const endMinutes = parseTime(end.value);

    if (startMinutes === null || endMinutes === null) {
        return null;
    }

    let diff = endMinutes - startMinutes;

    // crossed midnight
    if (diff < 0) {
        diff += 24 * 60;
    }

    return diff;
});

const formattedResult = computed(() => {
    if (elapsedMinutes.value === null) {
        return "--:--";
    }

    const hours = Math.floor(elapsedMinutes.value / 60);
    const minutes = elapsedMinutes.value % 60;

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");

    return `${h}:${m}`;
});
</script>
