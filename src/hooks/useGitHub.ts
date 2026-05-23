import useSWR from "swr";
import { fetcher, fetchGithubRepositoriesGQL, type RepositoryData } from "@services/api";

export const useGitHubReposGQL = (repoNames: string[]) => {
	const fetcher = () => fetchGithubRepositoriesGQL(repoNames);
	const { data, error } = useSWR("githubRepos", fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		errorRetryCount: 0,
		refreshInterval: 0,
		onError: (err) => {
			console.error(err);
		},
	});

	return {
		repos: data as Record<string, RepositoryData> | undefined,
		isLoading: !error && !data,
		isError: error,
	};
};

export const useGithubRepos = () => {
	const { data, error, isLoading } = useSWR(
		`https://api.github.com/user/repos?visibility=all&affiliation=owner&sort=created&per_page=80`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	return {
		repos: data,
		isLoading,
		isError: !!error,
	};
};
