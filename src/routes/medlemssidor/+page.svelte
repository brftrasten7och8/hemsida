<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { debounce } from '$lib/utils/debounce';

	let memberPage: App.Entry | undefined;

	let isDebouncing = false;
	let loginError = false;
	let hasCheckedLogin = false;

	onMount(() => {
		const secret = localStorage.getItem('s') as string | null;
		if (secret) {
			fetchMemberPages(secret);
		} else {
			hasCheckedLogin = true;
		}
	});

	async function fetchMemberPages(secret: string, submittedFromForm?: boolean) {
		if (!browser) return;
		const data = await fetch(`${window.location.origin}/api/member.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `secret=${secret}`
		});
		const result = await data.json();

		if (result && Object.keys(result).length) {
			localStorage.setItem('s', secret);
			memberPage = result;
		} else if (submittedFromForm) {
			const input = document.getElementById('password') as HTMLInputElement | null;
			if (input?.value) input.value = '';
			loginError = true;
			localStorage.setItem('s', '');
		}

		hasCheckedLogin = true;
	}

	function handleLoginSubmit(e: any) {
		loginError = false;
		isDebouncing = true;
		debouncedLoginSubmit(e);
	}

	const debouncedLoginSubmit = debounce(async (e: any) => {
		isDebouncing = false;
		scrollToTop();
		const form = e.target;
		const secret = form?.password?.value.toLowerCase();
		fetchMemberPages(secret, true);
	});

	function handleLogout() {
		localStorage.setItem('s', '');
		memberPage = undefined;
		scrollToTop();
	}

	function scrollToTop() {
		if (!browser) return;
		window.scrollTo({
			top: 0,
			left: 0
		});
	}
</script>

{#if memberPage}
	<div class="memberpage">
		<Page page={memberPage} />
		<article>
			<p class="logout-info">Du är inloggad.</p>
			<button class="logout-button" on:click={handleLogout}>Logga ut</button>
		</article>
	</div>
{:else if hasCheckedLogin}
	<article>
		<h1>Medlemssidor</h1>
		<p>Ange lösenord för att komma åt medlemssidor</p>
		<form method="post" on:submit|preventDefault={handleLoginSubmit}>
			<label>
				Lösenord<br />
				<input type="text" name="password" disabled={isDebouncing} id="password" />
			</label>
			<button type="submit" disabled={isDebouncing}>Logga in</button>
			{#if loginError}
				<div class="error">Fel lösenord, försök igen</div>
			{/if}
		</form>
	</article>
{/if}

<style>
	.memberpage {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.memberpage article {
		margin-top: auto;
	}

	.error {
		color: red;
	}

	.logout-info {
		font-style: italic;
		margin-top: var(--padding-small);
	}
</style>
